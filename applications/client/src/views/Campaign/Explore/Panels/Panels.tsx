import type { AppStore } from '@redeye/client/store';
import { InfoType, Tabs } from '@redeye/client/types/explore';
import { PanelHeader } from '@redeye/client/views';
import { Beacons, HostBeacons } from './Beacon';
import { Commands } from './Command';
import { Comments } from './Comment';
import { Hosts } from './Host';
import { BeaconMeta, HostMeta, ServerMeta } from './Meta';
import { Operators } from './Operator';
import { OverviewBeacons, OverviewCommandTypes, OverviewHosts, OverviewOperators } from './Overview';

export interface SortOption {
	label: string;
	key: string;
}

export const SortBy: Record<string, SortOption> = {
	TIME: { label: 'Time', key: 'minTime' },
	ID: { label: 'ID', key: 'id' },
};

export const TabNames: Record<Tabs, string> = {
	[Tabs.BEACONS]: 'Beacons',
	[Tabs.HOSTS]: 'Hosts',
	[Tabs.COMMANDS]: 'Commands',
	[Tabs.COMMANDS_OVERVIEW]: 'Command Types',
	[Tabs.OPERATORS]: 'Operators',
	[Tabs.COMMENTS]: 'Comments',
	[Tabs.METADATA]: 'Meta',
};

export enum CommentFilterOptions {
	FAVORITE = 'fav',
	OPERATOR = 'user',
	TIME = 'minTime',
}

// Defaults to the first one if unable to find a similar key
export const sortOptions: Record<Tabs, SortOption[]> = {
	[Tabs.BEACONS]: [SortBy.TIME, { label: 'Name', key: 'beaconName' }, SortBy.ID],
	[Tabs.HOSTS]: [SortBy.TIME, { label: 'Name', key: 'hostName' }, SortBy.ID],
	[Tabs.COMMANDS_OVERVIEW]: [{ label: 'Name', key: 'text' }, SortBy.ID],
	[Tabs.COMMANDS]: [
		{ label: 'Time', key: 'time' },
		{ label: 'Name', key: 'name' },
	],
	[Tabs.COMMENTS]: [
		{ label: 'Time', key: CommentFilterOptions.TIME },
		{ label: 'Operator', key: CommentFilterOptions.OPERATOR },
		{ label: 'Favorited', key: CommentFilterOptions.FAVORITE },
	],
	[Tabs.OPERATORS]: [
		{
			label: 'Time',
			key: 'startTime',
		},
		{ label: 'Name', key: 'name' },
		SortBy.ID,
	],
	[Tabs.METADATA]: [
		{
			label: 'Time',
			key: 'startTime',
		},
		{ label: 'Name', key: 'name' },
		SortBy.ID,
	],
};

export const InfoPanelTabs = {
	[InfoType.BEACON]: {
		title: (store: AppStore) => (
			<PanelHeader>{store.campaign?.interactionState.selectedBeacon?.current?.computedName}</PanelHeader>
		),
		panels: {
			[Tabs.COMMANDS]: (props) => <Commands showPath={false} {...props} />,
			[Tabs.OPERATORS]: Operators,
			[Tabs.COMMENTS]: Comments,
			[Tabs.METADATA]: BeaconMeta,
		},
	},
	[InfoType.OVERVIEW]: {
		title: (store: AppStore) => {
			const campaign = store.graphqlStore.campaigns.get((store.router.params?.id || '0') as string);
			return <PanelHeader>{campaign?.name}</PanelHeader>;
		},
		panels: {
			[Tabs.HOSTS]: OverviewHosts,
			[Tabs.OPERATORS]: OverviewOperators,
			[Tabs.COMMENTS]: Comments,
			[Tabs.BEACONS]: OverviewBeacons,
			[Tabs.COMMANDS_OVERVIEW]: OverviewCommandTypes,
		},
	},
	[InfoType.SERVER]: {
		title: (store: AppStore) => (
			<PanelHeader>{store.campaign?.interactionState.selectedServer?.current?.computedName}</PanelHeader>
		),
		panels: {
			[Tabs.HOSTS]: Hosts,
			[Tabs.OPERATORS]: Operators,
			[Tabs.BEACONS]: Beacons,
			[Tabs.METADATA]: ServerMeta,
		},
	},
	[InfoType.HOST]: {
		title: (store: AppStore) => (
			<PanelHeader>{store.campaign?.interactionState.selectedHost?.current?.computedName}</PanelHeader>
		),
		panels: {
			[Tabs.COMMANDS]: Commands,
			[Tabs.OPERATORS]: Operators,
			[Tabs.COMMENTS]: Comments,
			[Tabs.BEACONS]: HostBeacons,
			[Tabs.METADATA]: HostMeta,
		},
	},
	[InfoType.OPERATOR]: {
		title: (store: AppStore) => <PanelHeader>{store.campaign?.interactionState.selectedOperator?.id}</PanelHeader>,
		panels: {
			[Tabs.COMMANDS]: Commands,
			[Tabs.BEACONS]: Beacons,
		},
	},
	[InfoType.COMMAND]: {
		title: (store: AppStore) => <PanelHeader>{store.campaign?.interactionState.selectedCommandType?.id}</PanelHeader>,
		panels: {
			[Tabs.COMMANDS]: Commands,
			[Tabs.COMMENTS]: Comments,
		},
	},
};
