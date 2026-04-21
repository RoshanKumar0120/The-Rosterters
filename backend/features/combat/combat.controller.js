import { chooseOpponentTeam, chooseOpponentTurn, judgeRound, finalizeDebateVerdict } from "./combat.service.js";
import DiscussionReport from "../message/discussionReport.model.js";

export async function selectTeam(req, res) {
  try {
    const { topic, candidateIds = [], count = 3, difficulty = "standard", ollamaModel = "" } = req.body || {};
    if (!topic) return res.status(400).json({ message: "topic is required." });
    const result = await chooseOpponentTeam({ topic, candidateIds, count, difficulty, ollamaModel });
    return res.json(result);
  } catch (error) {
    console.error("Combat select-team failed:", error);
    return res.status(500).json({ message: "Failed to select opponent team.", error: error.message });
  }
}

export async function nextTurn(req, res) {
  try {
    const { topic, opponentTeamIds = [], userArgument = "", strategies = [], difficulty = "standard", ollamaModel = "" } = req.body || {};
    if (!topic) return res.status(400).json({ message: "topic is required." });
    if (!opponentTeamIds.length) return res.status(400).json({ message: "opponentTeamIds is required." });
    if (!strategies.length) return res.status(400).json({ message: "strategies is required." });
    const result = await chooseOpponentTurn({ topic, opponentTeamIds, userArgument, strategies, difficulty, ollamaModel });
    return res.json(result);
  } catch (error) {
    console.error("Combat next-turn failed:", error);
    return res.status(500).json({ message: "Failed to select opponent turn.", error: error.message });
  }
}

export async function judge(req, res) {
  try {
    const { topic, playerArgument, opponentArgument, ollamaModel = "" } = req.body || {};
    if (!topic) return res.status(400).json({ message: "topic is required." });
    if (!playerArgument || !opponentArgument) {
      return res.status(400).json({ message: "playerArgument and opponentArgument are required." });
    }
    const result = await judgeRound({ topic, playerArgument, opponentArgument, ollamaModel });
    return res.json(result);
  } catch (error) {
    console.error("Combat judge failed:", error);
    return res.status(500).json({ message: "Failed to judge round.", error: error.message });
  }
}

export async function verdict(req, res) {
  try {
    const {
      sessionId = "",
      topic,
      playerTeam = [],
      opponentTeam = [],
      combatLog = [],
      roundResults = [],
      scores = {},
      ollamaModel = "",
      mode = "combat",
    } = req.body || {};

    if (!topic) return res.status(400).json({ message: "topic is required." });

    const generatedAt = Date.now();
    const result = await finalizeDebateVerdict({
      topic,
      playerTeam,
      opponentTeam,
      combatLog,
      roundResults,
      scores,
      ollamaModel,
      mode,
    });

    const finalVerdict = {
      ...result,
      mode,
      topic,
      sessionId: String(sessionId || "").trim(),
      generatedAt,
    };

    if (finalVerdict.sessionId) {
      await DiscussionReport.findOneAndUpdate(
        { sessionId: finalVerdict.sessionId, topic },
        {
          $set: {
            mode,
            verdict: finalVerdict,
            messageCount: Array.isArray(combatLog) ? combatLog.length : 0,
            generatedAt,
            updatedAt: generatedAt,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    return res.json({ verdict: finalVerdict });
  } catch (error) {
    console.error("Combat final verdict failed:", error);
    return res.status(500).json({ message: "Failed to finalize verdict.", error: error.message });
  }
}
