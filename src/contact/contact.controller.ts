import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  async getAllContacts(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return await this.contactService.getAllContacts();
  }

  @Get(':contactId')
  async getContactById(@Param('contactId') contactId: string) {
    return await this.contactService.getContactById(contactId);
  }

  @Put('update/:contactId')
async updateContact(@Param('contactId') contactId: string, @Body() updateContactDto: UpdateContactDto) {
  return await this.contactService.updateContact(contactId, updateContactDto);
}

  @Delete('delete/:contactId')
  async deleteContact(@Param('contactId') contactId: string) {
    return await this.contactService.deleteContact(contactId);
  }
}