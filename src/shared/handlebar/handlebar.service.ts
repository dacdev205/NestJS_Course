import * as handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HandlebarsService {
  async compileTemplate(
    templateContent: string,
    context: any,
  ): Promise<string> {
    const template = handlebars.compile(templateContent);
    const html = template(context);
    return html;
  }
}
