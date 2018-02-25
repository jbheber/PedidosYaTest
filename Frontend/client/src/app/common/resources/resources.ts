import * as Spanish from "./es";
import * as English from "./en";

export class Resources {
    private static translations: any = {
        es: Spanish.strings,
        en: English.strings
    }

    public static get(resourceName: string, locale: string): string {
        return Resources.translations[locale][resourceName];
    }
}