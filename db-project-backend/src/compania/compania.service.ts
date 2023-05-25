import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { config } from 'dotenv';
import { Compania } from 'src/entities/compania.entity';

@Injectable()
export class CompaniaService {
 
  constructor(
    // private readonly usersService: UsersService,
    @InjectRepository(Compania)
    private readonly companiaRepository: Repository<Compania>,
  ) {}

  async getCompanias(){
    try{
        const companias = await this.companiaRepository.find()
        if(companias.length === 0){
            return {
                success: false,
                message: "No hay compañias",
              };
        }
        return {
            success: true,
            data: companias
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getCompaniasWithLimit(limit: number){
    try{
        const companias = await this.companiaRepository.find({
            take: limit
        })
        if(companias.length === 0){
            return {
                success: false,
                message: "No hay compañias",
              };
        }
        return {
            success: true,
            data: companias
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

//   async getAuditDocument(documentId: string, hash: string, fileName: string, prefix: string) {
//     try {
//       if (documentId) {
//         const participation = await this.documentsRepository.find({
//           relations: ['participations', 'participations.user'],
//           where: {
//             id: documentId,
//           },
//         });
//         return {
//           success: true,
//           data: participation,
//         };
//       }

//       if (hash) {
//         const participation = await this.documentsRepository.find({
//           relations:  ['participations', 'participations.user'],
//           where: {
//             hash: hash,
//           },
//         });
//         return {
//           success: true,
//           data: participation,
//         };
//       }

//       if (fileName) {
//         const participation = await this.documentsRepository.find({
//           relations:  ['participations', 'participations.user'],
//           where: {
//             filename: fileName,
//           },
//         });
//         return {
//           success: true,
//           data: participation,
//         };
//       }

//       if (prefix) {
//         const participation = await this.documentsRepository.find({
//           relations: ['participations', 'participations.user'],
//             where: {
//               filename: Like(`${prefix}%`),
//            },
//         });
//         return {
//           success: true,
//           data: participation,
//         };
//         }

//       return {
//         success: false,
//         message: 'Document not found',
//       };
//     } catch (err) {
//       return {
//         success: false,
//         message: err.message,
//       };
//     }
//   }
}
