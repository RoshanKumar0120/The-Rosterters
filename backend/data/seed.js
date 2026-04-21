import Agent from "../features/agent/agent.model.js";
import Message from "../features/message/message.model.js";
import { AGENTS, MENTOR_MOCK_MESSAGES } from "./mockData.js";
import { medical_specialists } from "./preBuildAgents.js";

function enrichDescription(agent) {
  const methodsByRole = {
    "Cardiac Surgeon": "Method: diagnostic precision, surgical planning, evidence-based cardiac interventions, patient-centered care.",
    "Neurologist": "Method: neurological examination, diagnostic reasoning, literature synthesis, empathetic patient management.",
    "Neurosurgeon": "Method: surgical planning, neurological assessment, evidence-based procedures, minimally invasive techniques.",
    "Oncologist": "Method: evidence-based cancer treatment, clinical trial integration, personalized medicine, compassionate care.",
    "Gastroenterologist": "Method: diagnostic endoscopy, differential diagnosis, therapeutic intervention, systematic assessment.",
    "Gynecologist": "Method: reproductive health expertise, trauma-informed care, holistic healing approaches, compassionate support.",
  };
  const constraints = "Constraints: stay in character, be evidence-led, avoid hallucinated facts, and explicitly flag uncertainty.";
  return `${agent.description} ${methodsByRole[agent.role] || "Method: structured analytical reasoning."} ${constraints}`;
}

async function seedDatabase() {
  const prebuiltAgents = medical_specialists || [];
  const mergedAgents = [...AGENTS, ...prebuiltAgents].reduce((acc, agent) => { acc.set(agent.id, agent); return acc; }, new Map());
  const enrichedAgents = Array.from(mergedAgents.values()).map((agent) => ({ ...agent, description: enrichDescription(agent) }));

  await Promise.all(enrichedAgents.map((agent) => Agent.updateOne({ id: agent.id }, { $set: agent }, { upsert: true })));
  await Promise.all(MENTOR_MOCK_MESSAGES.map((message) => Message.updateOne({ id: message.id }, { $set: message }, { upsert: true })));
}

export { seedDatabase };