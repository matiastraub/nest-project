import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({ ...createItemDto.listing, rating: 0 });
    const item = new Item({ ...createItemDto, comments: [], listing });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find({ relations: { listing: true } });
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundError('Item not found');
    }
    if (updateItemDto.public !== undefined) {
      item.public = updateItemDto.public;
    }

    if (updateItemDto.comments) {
      item.comments = updateItemDto.comments.map((dto) =>
        this.entityManager.create(Comment, {
          content: dto.content,
          item,
        }),
      );
    }
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    return this.itemsRepository.delete(id);
  }
}
