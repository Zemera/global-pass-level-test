import { Injectable, NotFoundException } from "@nestjs/common";
import { DeepPartial, EntitySchema, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

@Injectable()

export class BaseService<T extends ObjectLiteral, CreateDto extends DeepPartial<T>, UpdateDto extends DeepPartial<T>>  {
    constructor(
        private readonly repository: Repository<T>,) {
    }

    findAll() {
        return this.repository.find()
    }

    async fineOne(id): Promise<T> {
        const obj = await this.repository.findOneBy({id : id});
        if (!obj)
            throw new NotFoundException(`Row ${id} not found`);
        return obj
    }

    create(createDto: CreateDto): Promise<T> {
        const createObj = this.repository.create(createDto)
        return this.repository.save(createObj);
    }

    async createIfNotExist(createDto: CreateDto): Promise<T> {
        
        let found = await this.repository.findOneBy({...createDto})
        if (found) return found ;
        
       return this.create(createDto)
    }

    async update(id: number, updateDto: UpdateDto): Promise<T> {
        const updateObj = await this.repository.preload({
            id,
            ...updateDto
        });
        if (!updateObj)
            throw new NotFoundException(`Row ${id} not found`);

        return this.repository.save(updateObj)
    }


    async preload(obj: DeepPartial<T>) {
        return this.repository.save(obj)
    }

    async remove(id) {
        const obj = await this.fineOne(id);
        return this.repository.remove(obj)
    }

    async fineOneByQuery(query: FindOptionsWhere<T> | FindOptionsWhere<T>[], relations = []): Promise<T> {
        return await this.repository.findOne({ where: query, relations })
    }
}