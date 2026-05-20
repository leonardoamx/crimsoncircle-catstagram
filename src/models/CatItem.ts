export type CatItem = {
  id: string
  url: string
  width: number
  height: number
  breeds: any[]
  categories: {
    id: number
    name: string
  }[]
};