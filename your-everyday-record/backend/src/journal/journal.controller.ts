import { Controller, Get, Post, Body } from '@nestjs/common';
import { JournalService } from './journal.service';

@Controller('api/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async getEntries() {
    return this.journalService.findAll();
  }

  @Post()
  async createEntry(@Body() body: any) {
    return this.journalService.create(body);
  }
}