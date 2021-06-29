export interface IBingoRoom {
  friendBingoList: IBingo[]
  id: number
  inviteCode: string
}

export interface IBingo {
  id: number
  bingoRoomId: number
  maxCount: number
  bingoItems: IBingoItem[]
}

export interface IBingoItem {
  id: number
  seq: number
  contents: string
  todayHistory: {
    done: boolean
    pictureUri?: string
  }
}
