window.Actions = {
  damage1: {
    name: "whomp!",
    success: [
      {type: "textMessage", text: "{CASTER} use {ACTION}!"},
      {type: "animation", animation: "spin"},
      {type: "stateChange", damage: 10},
    ]
  }
}
