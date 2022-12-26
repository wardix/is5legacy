import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { CreateNewCustomerDto } from './dto/create-customer.dto';
import { DataSource } from 'typeorm';

@UseGuards(AuthGuard('api-key'))
@Controller('customers')
export class CustomersController {
  constructor(
    private dataSource: DataSource,
    private readonly customersService: CustomersService,
  ) {}

  @Get(':customer_id')
  @HttpCode(200)
  async getCustomerDetail(@Param('customer_id') customer_id) {
    try {
      const resultAllCustomers =
        await this.customersService.getCustomerServices(customer_id);
      return {
        data: resultAllCustomers,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        title: 'Internal Server Error',
        message: 'Failed to load resource. please try again later',
      });
    }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async saveNewCustomer(@Body() createNewCustomerDto: CreateNewCustomerDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveNewCustomers =
        await this.customersService.saveNewCustomerServices(
          createNewCustomerDto,
        );

      await queryRunner.manager.save(saveNewCustomers.data_pelanggan);
      await queryRunner.manager.save(saveNewCustomers.data_phonebook_1);
      if (
        saveNewCustomers.data_phonebook_1.phone !=
        saveNewCustomers.data_phonebook_2.phone
      ) {
        await queryRunner.manager.save(saveNewCustomers.data_phonebook_2);
      }
      await queryRunner.manager.save(saveNewCustomers.data_layanan);
      await queryRunner.manager.save(saveNewCustomers.data_npwp);
      await queryRunner.commitTransaction();

      return {
        title: 'Success',
        message: 'Success to save resource',
        data: saveNewCustomers.data_layanan.CustId,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException({
        title: 'Conflict',
        message: 'Failed to save resource. please try again later',
      });
    }
  }

  // @Post(':id/services')
  // @UsePipes(ValidationPipe)
  // async saveDataCustServices(@Body() createCustomerDto: CreateCustomerDto) {
  //   try {
  //     const saveDataCustomerServices =
  //       await this.customersService.saveDataCustomerServLogic(
  //         createCustomerDto,
  //       );
  //     return saveDataCustomerServices;
  //   } catch (error) {
  //     throw new InternalServerErrorException({
  //       title: 'Failed',
  //       message:
  //         'Proses simpan data layanan gagal, silahkan coba beberapa saat lagi.',
  //     });
  //   }
  // }
}
