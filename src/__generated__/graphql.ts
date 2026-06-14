/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Event = {
  __typename?: 'Event';
  finished: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  is_current: Scalars['Boolean']['output'];
};

export type Player = {
  __typename?: 'Player';
  fpl_player_cost: Scalars['Float']['output'];
  fpl_player_id: Scalars['String']['output'];
  fpl_player_position: Scalars['String']['output'];
  fpl_selected_by_percent: Scalars['Float']['output'];
  fpl_team_name: Scalars['String']['output'];
  fpl_web_name: Scalars['String']['output'];
  player_gameweek_stats: Array<PlayerGameweekStats>;
  player_stats: PlayerStats;
};


export type PlayerPlayer_StatsArgs = {
  gwEnd: Scalars['Int']['input'];
  gwStart: Scalars['Int']['input'];
};

export type PlayerGameweekStats = {
  __typename?: 'PlayerGameweekStats';
  calc_xgap: Scalars['Float']['output'];
  fpl_assists: Scalars['Int']['output'];
  fpl_bps: Scalars['Int']['output'];
  fpl_clean_sheet: Scalars['Int']['output'];
  fpl_defensive_contribution: Scalars['Int']['output'];
  fpl_expected_assists: Scalars['Float']['output'];
  fpl_expected_goals: Scalars['Float']['output'];
  fpl_goals_scored: Scalars['Int']['output'];
  fpl_minutes: Scalars['Int']['output'];
  fpl_round: Scalars['Int']['output'];
  fpl_total_points: Scalars['Int']['output'];
  fpl_xgi: Scalars['Float']['output'];
  sm_big_chances_created: Scalars['Int']['output'];
  sm_key_passes: Scalars['Int']['output'];
  sm_shots_on_target: Scalars['Int']['output'];
};

export type PlayerStats = {
  __typename?: 'PlayerStats';
  games_played: Scalars['Int']['output'];
  sum_assists: Scalars['Int']['output'];
  sum_big_chances_created: Scalars['Int']['output'];
  sum_bps: Scalars['Int']['output'];
  sum_cleansheets: Scalars['Int']['output'];
  sum_defensive_contributions: Scalars['Int']['output'];
  sum_goals: Scalars['Int']['output'];
  sum_key_passes: Scalars['Int']['output'];
  sum_minutes: Scalars['Int']['output'];
  sum_points: Scalars['Int']['output'];
  sum_shots_on_target: Scalars['Int']['output'];
  sum_xa: Scalars['Float']['output'];
  sum_xg: Scalars['Float']['output'];
  sum_xgap: Scalars['Float']['output'];
  sum_xgi: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Event>;
  players: Array<Player>;
  teams: Array<Team>;
};

export type Team = {
  __typename?: 'Team';
  name: Scalars['String']['output'];
};

export type GetPlayerDataQueryVariables = Exact<{
  gwStart: Scalars['Int']['input'];
  gwEnd: Scalars['Int']['input'];
}>;


export type GetPlayerDataQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', fpl_player_id: string, fpl_web_name: string, fpl_team_name: string, fpl_player_position: string, fpl_player_cost: number, fpl_selected_by_percent: number, player_stats: { __typename?: 'PlayerStats', games_played: number, sum_minutes: number, sum_points: number, sum_goals: number, sum_assists: number, sum_bps: number, sum_cleansheets: number, sum_defensive_contributions: number, sum_xg: number, sum_xa: number, sum_xgi: number, sum_shots_on_target: number, sum_big_chances_created: number, sum_key_passes: number, sum_xgap: number } }>, teams: Array<{ __typename?: 'Team', name: string }>, events: Array<{ __typename?: 'Event', id: number, is_current: boolean, finished: boolean }> };


export const GetPlayerDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlayerData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gwStart"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gwEnd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fpl_player_id"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_web_name"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_team_name"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_player_position"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_player_cost"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_selected_by_percent"}},{"kind":"Field","name":{"kind":"Name","value":"player_stats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gwStart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gwStart"}}},{"kind":"Argument","name":{"kind":"Name","value":"gwEnd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gwEnd"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games_played"}},{"kind":"Field","name":{"kind":"Name","value":"sum_minutes"}},{"kind":"Field","name":{"kind":"Name","value":"sum_points"}},{"kind":"Field","name":{"kind":"Name","value":"sum_goals"}},{"kind":"Field","name":{"kind":"Name","value":"sum_assists"}},{"kind":"Field","name":{"kind":"Name","value":"sum_bps"}},{"kind":"Field","name":{"kind":"Name","value":"sum_cleansheets"}},{"kind":"Field","name":{"kind":"Name","value":"sum_defensive_contributions"}},{"kind":"Field","name":{"kind":"Name","value":"sum_xg"}},{"kind":"Field","name":{"kind":"Name","value":"sum_xa"}},{"kind":"Field","name":{"kind":"Name","value":"sum_xgi"}},{"kind":"Field","name":{"kind":"Name","value":"sum_shots_on_target"}},{"kind":"Field","name":{"kind":"Name","value":"sum_big_chances_created"}},{"kind":"Field","name":{"kind":"Name","value":"sum_key_passes"}},{"kind":"Field","name":{"kind":"Name","value":"sum_xgap"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_current"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}}]}}]} as unknown as DocumentNode<GetPlayerDataQuery, GetPlayerDataQueryVariables>;