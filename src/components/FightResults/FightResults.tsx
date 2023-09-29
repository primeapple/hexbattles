import { type Component, Show, Switch, Match, For } from 'solid-js';
import { useGameState } from '../../contexts/GameState';
import { type RoundResult, FightOutcome } from '../../types';

type RoundResultsProps = { result: RoundResult };

const RoundResults: Component<RoundResultsProps> = (props) => {
    return (
        <tr>
            <td>{props.result.attackerRoll}</td>
            <td>{props.result.defenderRoll}</td>
            <td>{props.result.attackerModifier}</td>
            <td>
                <em>{props.result.outcome}</em>
            </td>
        </tr>
    );
};

type FightResultsProps = {};

export const FightResults: Component<FightResultsProps> = (props) => {
    const [, { getLastFightResult }] = useGameState();

    return (
        <Show when={getLastFightResult()}>
            {(result) => (
                <div>
                    <h3>Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>Attacker</td>
                                <td>Defender</td>
                                <td>Modificator</td>
                                <td>Outcome</td>
                            </tr>
                        </thead>
                        <For each={result().roundResults}>{(roundResult) => <RoundResults result={roundResult} />}</For>
                    </table>
                    <Switch>
                        <Match when={result().outcome === FightOutcome.ATTACKER_WIN}>
                            Attacker {result().attacker.player} won this fight!
                        </Match>
                        <Match when={result().outcome === FightOutcome.DEFENDER_WIN}>
                            Defender {result().defender.player} won this fight!
                        </Match>
                        <Match when={result().outcome === FightOutcome.TIE}>
                            It was a tie between Attacker {result().attacker.player} (-{result().attacker.losses}) and
                            Defender {result().defender.player} (-{result().defender.losses}).
                        </Match>
                    </Switch>
                </div>
            )}
        </Show>
    );
};
