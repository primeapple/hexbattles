import { type Component, Show } from 'solid-js';
import { useGameState } from '../../contexts/GameState';
import { type RoundResult } from '../../types';

type RoundResultsProps = { result: RoundResult };

const RoundResults: Component<RoundResultsProps> = (props) => {
    return (
        <div>
            <div>Attacker roll: {props.result.attackerRoll}</div>
            <div>Defender roll: {props.result.defenderRoll}</div>
            <div>Attacker modifier: {props.result.attackerModifier}</div>
            <div>Outcome: {props.result.outcome}</div>
        </div>
    );
};

type FightResultsProps = {};

export const FightResults: Component<FightResultsProps> = (props) => {
    const [, { getLastFightResult }] = useGameState();

    return (
        <Show when={getLastFightResult()}>
            {(result) => (
                <>
                    <h3>Results</h3>
                    <div>
                        {result().roundResults.map((result) => (
                            <RoundResults result={result} />
                        ))}
                    </div>
                </>
            )}
        </Show>
    );
};
