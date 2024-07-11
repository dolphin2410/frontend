export class Metadata {
    hash: string
    action: string
    status: string
    timestamp: string
  
    constructor(hash: string, action: string, status: string, timestamp: string) {
      this.hash = hash
      this.action = action
      this.status = status
      this.timestamp = timestamp
    }
  }