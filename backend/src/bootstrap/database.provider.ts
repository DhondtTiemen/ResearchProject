import { Injectable } from '@nestjs/common'
import * as mssql from 'mssql'

@Injectable()
export class MssqlService {
  private config: any
  private connection: any
  constructor() {
    this.config = {
      user: 'tiemendhondt',
      password: 'Test1234!',
      server: 'reserearchprojectserver.database.windows.net',
      database: 'elpeedb',
    }
  }
  async createMssqlConnection() {
    try {
      this.connection = await new mssql.ConnectionPool(this.config).connect()
      return this.connection
    } catch (error) {
      console.log(error)
    }
  }
}
