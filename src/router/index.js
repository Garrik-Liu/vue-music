import Recommend from 'components/Recommend';
import Singer from 'components/Singer';
import Rank from 'components/Rank';
import Search from 'components/Search';

export default [{
        path: '/',
        redirect: '/recommend'
    },
    // 推荐页面
    {
        path: '/recommend',
        component: Recommend,

    },
    // 歌手页面
    {
        path: '/singer',
        component: Singer,

    },
    // 排行榜页面
    {
        path: '/rank',
        component: Rank,

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