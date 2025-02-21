import { FeaturedVideoService } from './FeaturedVideoService';
import { UserService } from './UserService';

export class ServiceProvider {
  private static userService: UserService;
  private static featuredVideoService: FeaturedVideoService;

  public static getUserService(): UserService {
    if (!this.userService) {
      // Instantiate UserService only once
      this.userService = new UserService();
    }

    return this.userService;
  }

  public static getFeaturedVideoService(): FeaturedVideoService {
    if (!this.featuredVideoService) {
      this.featuredVideoService = new FeaturedVideoService();
    }

    return this.featuredVideoService;
  }
}
