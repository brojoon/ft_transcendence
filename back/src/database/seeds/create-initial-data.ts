import { User } from 'common/decorators/user.decorator';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

// 초기값 넣어주는 seeding
export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 12312, name: 'youngrch', email: 'youngrch@naver.com' }])
      .execute();
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Channels)
    //   .values([{ id: 1, name: '일반', WorkspaceId: 1, private: false }])
    //   .execute();
  }
}
