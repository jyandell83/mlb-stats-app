export const getPlayMarker = (play) => {
  const eventType = play.result?.eventType;
  const detailsCode = play.playEvents?.at(-1)?.details?.code ?? "";

  if (eventType === "home_run") return "HR";
  if (eventType === "strikeout") {
    if (detailsCode === "C") return "ꓘ";
    if (detailsCode === "S") return "K";
    return "K";
  }

  if (
    [
      "field_out",
      "force_out",
      "grounded_into_double_play",
      "double_play",
      "sac_fly",
      "sac_bunt",
    ].includes(eventType)
  ) {
    return "●";
  }

  if (
    ["single", "double", "triple", "walk", "hit_by_pitch"].includes(eventType)
  ) {
    return "◆";
  }

  return "•";
};
