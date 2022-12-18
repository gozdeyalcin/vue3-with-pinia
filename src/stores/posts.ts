import { DateTime } from "luxon"
import { defineStore } from "pinia"
import { Period } from "../constants"
import { Post, today, thisWeek, thisMonth, TimelinePost } from "../posts"

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

function delay () {
  return new Promise<void>(res => setTimeout(res, 1500))
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: ['1','2','3'],
    all: new Map(),
    selectedPeriod: "Today"
  }),

  actions: {
    setSelectedPeriod (period: Period) {
      this.selectedPeriod = period;
    },

  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
      .map(id => {
        let post: any = null;
        if(id==='1') {
          post = {
            id: "1",
            authorId: "-1",
            title: "Today",
            created: DateTime.now().toISO(),
            markdown: '',
            html: '',
          }
        } else if(id === '2') {
          post = {
            id: "2",
            authorId: "-1",
            title: "This Week",
            created: DateTime.now().minus({ days: 5 }).toISO(),
            markdown: '',
            html: '',
          }
        } else if(id === '3') {
          post ={
            id: "3",
            authorId: "-1",
            title: "This Month",
            created: DateTime.now().minus({ weeks: 3 }).toISO(),
            markdown: '',
            html: '',
          }
        }

        return {
          ...post,
          created: DateTime.fromISO(post.created)
        }
      }).filter(f=>f.title == state.selectedPeriod)
      .filter(post => {
        if (state.selectedPeriod === "Today") {
          return post.created >= DateTime.now().minus({ day: 1 })
        }

        if (state.selectedPeriod  === "This Week") {
          return post.created >= DateTime.now().minus({ week: 1 })
        }
        return post
      })
    }
  }
})
