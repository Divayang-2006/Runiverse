import { Group } from "@/store/types";

export const mockGroups: Group[] = [
    { id: 'group-1', name: 'Diamond City Striders', color: '#6A5ACD', memberCount: 12 },
    { id: 'group-2', name: 'Tapi River Runners', color: '#DC143C', memberCount: 8 },
    { id: 'group-3', name: 'Surat Silk Sprinters', color: '#3CB371', memberCount: 15 },
];

export const mockLeaderboard = [
    { rank: 1, avatarUrl: 'https://i.pravatar.cc/150?u=user-2', name: 'RunnerPro', distance: 42195, trend: 'up', groupId: 'group-3' },
    { rank: 2, avatarUrl: 'https://i.pravatar.cc/150?u=user-3', name: 'SpeedyGonzales', distance: 38500, trend: 'down', groupId: 'group-2' },
    { rank: 3, avatarUrl: 'https://i.pravatar.cc/150?u=user-1', name: 'PlayerOne', distance: 35200, trend: 'up', groupId: 'group-1' },
    { rank: 4, avatarUrl: 'https://i.pravatar.cc/150?u=user-4', name: 'TrailBlazer', distance: 31000, trend: 'stable', groupId: 'group-3' },
    { rank: 5, avatarUrl: 'https://i.pravatar.cc/150?u=user-5', name: 'PaceMaker', distance: 29800, trend: 'down', groupId: 'group-1' },
];