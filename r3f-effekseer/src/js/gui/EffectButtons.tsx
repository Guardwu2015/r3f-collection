import {useContext} from "react";
import {effekseerManager, EffekseerReactContext} from "../effects/EffectContext";
import {EffectPlayer} from "../effects/EffectPlayer";


export function EffectButtons({effectNames}: { effectNames: string[] }) {

  console.log(effectNames);

  return (
    <div className="absolute bottom-0 left-0">
      {effectNames.map((name, i) =>
        <EffectButton effectPlayer={new EffectPlayer(name, effekseerManager.effects[name], effekseerManager)} key={i}/>
      )}
    </div>
  )
}


export function EffectButton({effectPlayer}: { effectPlayer: EffectPlayer }) {
  return (
    <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full m-2"
            onClick={() => {
              effectPlayer.setPosition(0, 0, -10);
              effectPlayer.play()
            }}>
      {effectPlayer.name}
    </button>
  )
}