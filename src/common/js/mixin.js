import { mapGetters, mapMutations, mapActions } from 'vuex'
import SearchBox from "components/Search/SearchBox";
import SearchList from "components/Search/SearchHistory";
import Suggest from "components/Search/SearchSuggest";
import { getSearch } from "api/search";
import { getSongDetail } from "api/song";
import { createSong } from "common/js/song";

export const playerMixin = {
    data() {
        return {
            liked: false
        }
    },

    computed: {
        likedIcon() {
            return this.liked ? "icon-favorite" : "icon-not-favorite";
        },
        ...mapGetters([
            "likedMusic"
        ])
    },

    methods: {

        checkLiked(song) {
            for (let i = 0; i < this.likedMusic.length; i++) {
                let item = this.likedMusic[i];
                if (item.mid === song.mid) {
                    return true;
                }
            }

            return false;
        },

        ...mapActions(["insertSongToLikedList",
            "deleteSongFromLikedList"
        ])
    }
}

export const SearchMixin = {
    data() {
        return {
            query: "",
            outerQuery: "",
            searchResult: [],
        }
    },

    computed: {
        ...mapGetters(["searchHistory"])
    },

    watch: {
        query() {
            if (this.query !== "") {
                this._getSearch(this.query, 50);
            }
        },
    },

    methods: {
        onQueryChange(query) {
            this.query = query;
        },

        setSearchQuery(query) {
            this.outerQuery = query;
        },

        _getSearch(query, length = 20) {
            getSearch(query, length).then(res => {
                if (res.status === 200) {
                    setTimeout(() => {
                        this.searchResult = res.data.data;
                    }, 2000);
                }
            });
        },
        onSuggestSongSelect(song) {
            getSongDetail(song.id).then(res => {
                let data = res.data.data;

                let song = createSong({
                    songmid: data.id,
                    singer: data.singer,
                    songname: data.name,
                    albumpic: data.pic,
                    interval: data.time,
                    songurl: data.url
                });

                this.insertSongToList(song);
            });
        },

        onHistoryDelete(index) {
            let searchHistory = this.searchHistory.concat();
            searchHistory.splice(index, 1);

            this.setSearchHistory(searchHistory);
        },

        ...mapMutations({
            setSearchHistory: "SET_SEARCH_HISTORY"
        }),

        ...mapActions(["insertSongToList"])
    },

    components: {
        SearchBox,
        SearchList,
        Suggest
    }
}