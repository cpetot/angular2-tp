import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent , APP_ROUTER_PROVIDERS} from './app.component';

bootstrap(AppComponent,
  APP_ROUTER_PROVIDERS
)
.catch(err => console.error(err));
