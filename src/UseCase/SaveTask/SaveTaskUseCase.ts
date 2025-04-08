import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor() {}

  async handle(dto: SaveTaskDto) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      throw new BadRequestException('Validation failed', validationErrors);
    }

    try {
      // Sauvegarde de la tâche avec Prisma
      await this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          dueDate: dto.dueDate,
          // Ajoute d'autres champs en fonction de ton DTO
        },
      });

    return null;
  }
}
