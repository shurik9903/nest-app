import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { DRIZZLE, DrizzleModule } from '../drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: DRIZZLE,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
