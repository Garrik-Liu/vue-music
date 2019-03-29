import Recommend from 'components/Recommend';
import Singer from 'components/Singer';
import Rank from 'components/Rank';
import Search from 'components/Search';
import RankMusicList from 'components/Rank/RankMusicList';
import SingerMusicList from 'components/Singer/SingerMusicList';
import RecommendMusicList from 'components/Recommend/RecommendMusicList';

export default [{
        path: '/',
        redirect: '/recommend'
    },
    // 推荐页面
    {
        path: '/recommend',
        component: Recommend,
        children: [
            { path: ':id', component: RecommendMusicList }
        ]

    },
    // 歌手页面
    {
        path: '/singer',
        component: Singer,
        children: [
            { path: ':id', component: SingerMusicList }
        ]

    },
    // 排行榜页面
    {
        path: '/rank',
        component: Rank,
        children: [
            { path: ':id', component: RankMusicList }
        ]

    },
    // 搜索页面
    {
        path: '/search',
        component: Search
    },
    // 全部匹配不到
    {
        path: '*',
        redirect: '/'
    }
];