import { MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const mailerConfig: MailerOptions = {
  transport: 'smtps://user@domain.com:pass@smtp.domain.com',
  defaults: {
    from: `"nest-modules" <modules@nestjs.com>`,
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
