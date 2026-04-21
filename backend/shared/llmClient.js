// ─────────────────────────────────────────────────────────────
// LLM Client — unified interface to multiple LLM providers
// (Ollama, Gemini, Claude, DeepSeek, OpenRouter) with
// automatic fallback and priority-based routing.
// ─────────────────────────────────────────────────────────────

import axios from "axios";
import { resolveOllamaModel } from "./agentModelRegistry.js";

function getOllamaBaseUrl() {
  return process.env.OLLAMA_BASE_URL || "http://localhost:11434";
}

function getOllamaOrchestratorModel() {
  return resolveOllamaModel();
}

function getOllamaTimeoutMs() {
  return Number(process.env.OLLAMA_TIMEOUT_MS || 60000);
}

function getOrchestratorTimeoutMs() {
  return Number(process.env.ORCHESTRATOR_TIMEOUT_MS || 15000);
}

function getOpenRouterApiKeys() {
  const candidates = [
    ["OPENROUTER_API_KEY", process.env.OPENROUTER_API_KEY],
    ["OPENROUTER_API_KEY1", process.env.OPENROUTER_API_KEY1],
  ];

  return candidates
    .map(([label, value]) => ({
      label,
      value: String(value || "").trim(),
    }))
    .filter((entry) => Boolean(entry.value));
}

function hasOpenRouterKey() {
  return getOpenRouterApiKeys().length > 0;
}

function getOrchestratorProvider() {
  return process.env.ORCHESTRATOR_PROVIDER || (hasOpenRouterKey() ? "openrouter" : "");
}

function getOrchestratorModel() {
  return process.env.ORCHESTRATOR_MODEL || "";
}

function getGeminiModel() {
  return process.env.GEMINI_MODEL || "gemini-1.5-flash";
}

function getClaudeModel() {
  return process.env.CLAUDE_MODEL || "claude-3-5-sonnet-latest";
}

function getDeepSeekModel() {
  return process.env.DEEPSEEK_MODEL || "deepseek-chat";
}

function getOpenRouterModel() {
  return process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";
}

function getLlmTimeoutMs() {
  return Number(process.env.LLM_TIMEOUT_MS || 90000);
}

function getProviderPriority(preferredProvider) {
  const providers = [];
  const pushProvider = (provider, enabled = true) => {
    if (!enabled || providers.includes(provider)) return;
    providers.push(provider);
  };

  pushProvider(preferredProvider, Boolean(preferredProvider));
  pushProvider("openrouter", hasOpenRouterKey());
  pushProvider("gemini", Boolean(process.env.GEMINI_API_KEY));
  pushProvider("claude", Boolean(process.env.CLAUDE_API_KEY));
  pushProvider("deepseek", Boolean(process.env.DEEPSEEK_API_KEY || process.env.DEEPSEARCH_API_KEY));
  pushProvider("ollama");

  return providers;
}

function getStrictProviderList(provider) {
  const normalizedProvider = String(provider || "").trim();
  return normalizedProvider ? [normalizedProvider] : [];
}

function formatProviderError(error) {
  const status = error?.response?.status;
  const details =
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.message ||
    (error?.code ? `Request failed with code ${error.code}` : "") ||
    "Unknown provider error";

  return status ? `${details} (status ${status})` : details;
}

async function callOllama({
  system,
  prompt,
  model = getOllamaOrchestratorModel(),
  temperature = 0.4,
  timeoutMs = getOllamaTimeoutMs(),
}) {
  const response = await axios.post(
    `${getOllamaBaseUrl().replace(/\/$/, "")}/api/generate`,
    {
      model,
      system,
      prompt,
      stream: false,
      options: { temperature },
    },
    { timeout: timeoutMs }
  );
  return (response.data?.response || "").trim();
}

async function callGemini({ system, prompt, model = getGeminiModel(), temperature = 0.4 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY.");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await axios.post(
    url,
    {
      contents: [{ role: "user", parts: [{ text: `${system}\n\n${prompt}` }] }],
      generationConfig: { temperature },
    },
    { timeout: getLlmTimeoutMs() }
  );
  return (
    response.data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n").trim() || ""
  );
}

async function callClaude({ system, prompt, model = getClaudeModel(), temperature = 0.4 }) {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) throw new Error("Missing CLAUDE_API_KEY.");

  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model,
      max_tokens: 1200,
      temperature,
      system,
      messages: [{ role: "user", content: prompt }],
    },
    {
      timeout: getLlmTimeoutMs(),
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    }
  );

  return (
    response.data?.content
      ?.filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n")
      .trim() || ""
  );
}

async function callDeepSeek({ system, prompt, model = getDeepSeekModel(), temperature = 0.4 }) {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.DEEPSEARCH_API_KEY;
  if (!apiKey) throw new Error("Missing DEEPSEEK_API_KEY/DEEPSEARCH_API_KEY.");

  const response = await axios.post(
    "https://api.deepseek.com/chat/completions",
    {
      model,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    },
    {
      timeout: getLlmTimeoutMs(),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
    }
  );

  return response.data?.choices?.[0]?.message?.content?.trim() || "";
}

async function callOpenRouter({ system, prompt, model = getOpenRouterModel(), temperature = 0.4 }) {
  const openRouterApiKeys = getOpenRouterApiKeys();

  if (!openRouterApiKeys.length) {
    throw new Error("Missing OPENROUTER_API_KEY or OPENROUTER_API_KEY1.");
  }

  let lastError;

  for (let index = 0; index < openRouterApiKeys.length; index += 1) {
    const { label: keyLabel, value: apiKey } = openRouterApiKeys[index];

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          temperature,
          messages: [
            { role: "system", content: system },
            { role: "user", content: prompt },
          ],
        },
        {
          timeout: getLlmTimeoutMs(),
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
          },
        }
      );

      if (index > 0) {
        console.warn(`[OpenRouter] Request succeeded with fallback key ${keyLabel}.`);
      }

      return response.data?.choices?.[0]?.message?.content?.trim() || "";
    } catch (error) {
      lastError = error;
      const status = error?.response?.status;
      const details =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Unknown OpenRouter error";

      console.error(
        `[OpenRouter] Request failed with ${keyLabel}${status ? ` (status ${status})` : ""}: ${details}`
      );

      if (index < openRouterApiKeys.length - 1) {
        const nextKeyLabel = openRouterApiKeys[index + 1].label;
        console.warn(`[OpenRouter] Retrying with fallback key ${nextKeyLabel}.`);
      } else if (openRouterApiKeys.length === 1) {
        console.warn("[OpenRouter] No fallback key configured after primary key failure.");
      }
    }
  }

  throw lastError || new Error("OpenRouter request failed for all configured API keys.");
}

async function callAgentLLM({ provider, model, system, prompt, temperature = 0.4 }) {
  const strictProviderCandidates = getStrictProviderList(provider);
  const providerCandidates = strictProviderCandidates.length
    ? strictProviderCandidates
    : getProviderPriority(provider);
  const requestedModel = model || process.env.OPENROUTER_MODEL || getOpenRouterModel();

  for (const providerCandidate of providerCandidates) {
    try {
      switch (providerCandidate) {
        case "gemini":
          return await callGemini({
            system,
            prompt,
            model: provider === "gemini" ? requestedModel : getGeminiModel(),
            temperature,
          });
        case "claude":
          return await callClaude({
            system,
            prompt,
            model: provider === "claude" ? requestedModel : getClaudeModel(),
            temperature,
          });
        case "deepseek":
          return await callDeepSeek({
            system,
            prompt,
            model: provider === "deepseek" ? requestedModel : getDeepSeekModel(),
            temperature,
          });
        case "openrouter":
          return await callOpenRouter({
            system,
            prompt,
            model: provider === "openrouter" ? requestedModel : getOpenRouterModel(),
            temperature,
          });
        case "ollama":
        default:
          return await callOllama({
            system,
            prompt,
            model:
              provider === "ollama"
                ? requestedModel
                : process.env.OLLAMA_MODEL || process.env.OLLAMA_MODEL || getOllamaOrchestratorModel(),
            temperature,
          });
      }
    } catch (error) {
      console.error("Agent LLM call failed:", {
        provider: providerCandidate,
        model: providerCandidate === provider ? requestedModel : undefined,
        message: formatProviderError(error),
      });

      if (strictProviderCandidates.length) {
        break;
      }
    }
  }

  return "I could not reach the model right now. Please continue and I will respond on the next turn.";
}

async function callOrchestratorLLM({ system, prompt, temperature = 0.4, ollamaModel = "" }) {
  const strictProviderCandidates = getStrictProviderList(process.env.ORCHESTRATOR_PROVIDER);
  const providerCandidates = strictProviderCandidates.length
    ? strictProviderCandidates
    : getProviderPriority(getOrchestratorProvider() || "openrouter");
  for (const provider of providerCandidates) {
    try {
      switch (provider) {
        case "gemini":
          return await callGemini({
            system,
            prompt,
            model: getOrchestratorModel() || getGeminiModel(),
            temperature,
          });
        case "claude":
          return await callClaude({
            system,
            prompt,
            model: getOrchestratorModel() || getClaudeModel(),
            temperature,
          });
        case "deepseek":
          return await callDeepSeek({
            system,
            prompt,
            model: getOrchestratorModel() || getDeepSeekModel(),
            temperature,
          });
        case "openrouter":
          return await callOpenRouter({
            system,
            prompt,
            model: getOrchestratorModel() || getOpenRouterModel(),
            temperature,
          });
        case "ollama":
        default:
          return await callOllama({
            system,
            prompt,
            model: getOrchestratorModel() || resolveOllamaModel(ollamaModel) || getOllamaOrchestratorModel(),
            temperature,
            timeoutMs: getOrchestratorTimeoutMs(),
          });
      }
    } catch (error) {
      console.error("Orchestrator LLM call failed:", { provider, message: formatProviderError(error) });
      if (strictProviderCandidates.length) {
        throw new Error(`Orchestrator provider "${provider}" failed: ${error?.message}`);
      }
    }
  }

  throw new Error("Orchestrator model unavailable.");
}

export {
  callAgentLLM,
  callOrchestratorLLM,
  callOllama,
  callGemini,
  callClaude,
  callDeepSeek,
  callOpenRouter,
  getOllamaOrchestratorModel as OLLAMA_ORCHESTRATOR_MODEL,
};
