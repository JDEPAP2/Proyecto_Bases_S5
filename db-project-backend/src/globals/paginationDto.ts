import { IsBooleanString, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";



export class PaginationDto{

    @IsOptional()
    limit?: number;

    @IsOptional()
    @IsString()
    idEmpleado?: string;

    @IsOptional()
    @IsString()
    idCurso?: string;

    @IsOptional()
    @IsBooleanString()
    best?: boolean;

    @IsOptional()
    @IsBooleanString()
    state?: boolean;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    modal?: string;
}

