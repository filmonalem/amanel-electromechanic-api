import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactStatus } from './contact-status.enum';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create({
      ...createContactDto,
      status: ContactStatus.PENDING, // Explicitly set, though entity default handles it
    });
    return await this.contactRepository.save(contact);
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async getContactById(contactId: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { contactId },
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }
    return contact;
  }

  async updateContact(
    contactId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    try {
      if (!updateContactDto || Object.keys(updateContactDto).length === 0) {
        throw new BadRequestException('UpdateContactDto is empty');
      }
      const contact = await this.getContactById(contactId);
      if (
        updateContactDto.status &&
        Object.values(ContactStatus).includes(updateContactDto.status)
      ) {
        contact.status = updateContactDto.status;
      } else {
        throw new BadRequestException(
          `Invalid or missing status: ${updateContactDto.status}`,
        );
      }
      const updatedContact = await this.contactRepository.save(contact);
      return updatedContact;
    } catch (error) {
      throw error instanceof NotFoundException ||
        error instanceof BadRequestException
        ? error
        : new BadRequestException(`Failed to update contact: `);
    }
  }
  async deleteContact(contactId: string): Promise<void> {
    const contact = await this.getContactById(contactId);
    await this.contactRepository.remove(contact);
  }
}
