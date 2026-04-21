export function buildReportCombatLog(mode, combatLog = [], messages = []) {
  if (mode === "combat") return combatLog;

  let round = 1;
  let sawUserTurnInRound = false;

  return (messages || [])
    .filter((entry) => entry && entry.speakerId !== "orchestrator" && String(entry.text || "").trim())
    .map((entry) => {
      const normalized = {
        id: entry.id,
        speakerId: entry.speakerId,
        speakerName: entry.speakerName,
        speakerInitials: entry.speakerInitials,
        isUser: Boolean(entry.isUser),
        text: String(entry.text || "").trim(),
        timestamp: entry.timestamp,
        round,
      };

      if (entry.isUser) {
        sawUserTurnInRound = true;
      } else if (sawUserTurnInRound) {
        sawUserTurnInRound = false;
        round += 1;
      }

      return normalized;
    });
}

export function buildReportPdfSections({ verdict, mode, topic, playerTeam = [], opponentTeam = [], combatLog = [], roundResults = [] }) {
  if (!verdict) return [];

  const sections = [
    { type: "title", text: `AI Council Report - ${String(mode || "session").replace(/-/g, " ")}` },
    { type: "paragraph", text: `Topic: ${topic || "Untitled debate"}` },
  ];

  if (mode === "combat") {
    sections.push(
      { type: "paragraph", text: `Player Council: ${playerTeam.map((agent) => agent.name).join(", ") || "Unknown"}` },
      { type: "paragraph", text: `Opponent Council: ${opponentTeam.map((agent) => agent.name).join(", ") || "Unknown"}` },
      {
        type: "paragraph",
        text: `Winner: ${String(verdict?.winner || "tie").toUpperCase()} | Final Score: Player ${verdict?.finalScore?.player ?? 0} - Opponent ${verdict?.finalScore?.opponent ?? 0}`,
      },
      { type: "heading", text: "Final Summary" },
      { type: "paragraph", text: verdict.summary || verdict.reasoning || "No final summary available." },
      { type: "heading", text: "Judge Reasoning" },
      { type: "paragraph", text: verdict.reasoning || "No judge reasoning available." },
      { type: "heading", text: "Key Moments" },
      {
        type: "list",
        items:
          verdict?.keyMoments?.length
            ? verdict.keyMoments
            : roundResults.map((result) => `Round ${result.round}: ${result.reasoning || result.winner}`),
      },
      { type: "heading", text: "Player Strengths" },
      { type: "list", items: verdict?.playerStrengths?.length ? verdict.playerStrengths : ["No strengths recorded."] },
      { type: "heading", text: "Player Weaknesses" },
      { type: "list", items: verdict?.playerWeaknesses?.length ? verdict.playerWeaknesses : ["No weaknesses recorded."] },
      { type: "heading", text: "Opponent Strengths" },
      { type: "list", items: verdict?.opponentStrengths?.length ? verdict.opponentStrengths : ["No strengths recorded."] },
      { type: "heading", text: "Opponent Weaknesses" },
      { type: "list", items: verdict?.opponentWeaknesses?.length ? verdict.opponentWeaknesses : ["No weaknesses recorded."] },
      { type: "heading", text: "Transcript Highlights" },
      {
        type: "list",
        items: combatLog.map((entry) => `${entry.speakerName}: ${String(entry.text || "").replace(/\s+/g, " ").trim()}`),
      }
    );
    return sections;
  }

  if (verdict.conclusion) {
    sections.push({ type: "heading", text: "Conclusion" }, { type: "paragraph", text: verdict.conclusion });
  }
  if (verdict.overallAssessment) {
    sections.push({ type: "heading", text: "Overall Assessment" }, { type: "paragraph", text: verdict.overallAssessment });
  }
  if (verdict.temporaryDiagnosis) {
    sections.push({ type: "heading", text: "Temporary Diagnosis" }, { type: "paragraph", text: verdict.temporaryDiagnosis });
  }
  if (verdict.legalAnalysis) {
    sections.push({ type: "heading", text: "Legal Analysis" }, { type: "paragraph", text: verdict.legalAnalysis });
  }
  if (verdict.eventSummary) {
    sections.push({ type: "heading", text: "Event Summary" }, { type: "paragraph", text: verdict.eventSummary });
  }
  if (verdict.topicOverview) {
    sections.push({ type: "heading", text: "Topic Overview" }, { type: "paragraph", text: verdict.topicOverview });
  }

  const listGroups = [
    ["strengths", "Strengths"],
    ["improvements", "Areas for Improvement"],
    ["advices", "Actionable Advice"],
    ["keyTakeaways", "Key Takeaways"],
    ["flaws", "Flaws to Fix"],
    ["technicalAdvice", "Technical Advice"],
    ["communicationAdvice", "Communication Advice"],
    ["nextSteps", "Next Steps"],
    ["urgentConcerns", "Urgent Concerns"],
    ["immediateActions", "Immediate Actions"],
    ["recommendedSpecialists", "Recommended Specialists"],
    ["preventiveMeasures", "Preventive Measures"],
    ["argumentsFor", "Arguments Supporting"],
    ["argumentsAgainst", "Counterarguments"],
    ["relevantLaws", "Applicable Laws"],
    ["caseReferences", "Case References"],
    ["references", "References"],
    ["commonThemes", "Common Themes"],
    ["divergentViews", "Divergent Views"],
  ];

  listGroups.forEach(([key, label]) => {
    if (Array.isArray(verdict[key]) && verdict[key].length) {
      sections.push({ type: "heading", text: label }, { type: "list", items: verdict[key] });
    }
  });

  if (Array.isArray(verdict.keyPerspectives) && verdict.keyPerspectives.length) {
    sections.push({
      type: "heading",
      text: "Key Perspectives",
    });
    sections.push({
      type: "list",
      items: verdict.keyPerspectives.map((item) => `${item.figure}: ${item.view}${item.era ? ` (${item.era})` : ""}`),
    });
  }

  if (Array.isArray(verdict.characterAnalysis) && verdict.characterAnalysis.length) {
    sections.push({
      type: "heading",
      text: "Character Analysis",
    });
    sections.push({
      type: "list",
      items: verdict.characterAnalysis.map(
        (item) => `${item.character}: ${item.perspective}${item.loreBackground ? ` | ${item.loreBackground}` : ""}`
      ),
    });
  }

  ["confidenceLevel", "doctorVisitUrgency", "whenToSeeFully", "recommendation", "conclusions", "historicalContext", "legacyAndImpact", "worldbuildingContext", "consensusAndConflict", "loreImplications", "synthesisReport", "disclaimer"].forEach((key) => {
    if (verdict[key]) {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
      sections.push({ type: "heading", text: label }, { type: "paragraph", text: verdict[key] });
    }
  });

  return sections;
}
