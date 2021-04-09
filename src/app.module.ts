import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { MongooseModule } from '@nestjs/mongoose'
 

@Module({
  imports: [
    ConfigModule.forRoot(), 
    RoutesModule, 
    MongooseModule.forRoot(
      process.env.MONGO_DSN,
      {
        useNewUrlParser: true
      }    
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
