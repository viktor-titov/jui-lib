import { GrafanaTheme2 } from '@grafana/data';
/**
 * Tries to get a dark variant color. Either by simply inverting the luminosity and darkening or lightening the color
 * a bit, or if base is provided, tries 2 variants of lighter and darker colors and checks which is more readable with
 * the base.
 * @param theme
 * @param hex
 * @param base
 */
export declare function autoColor(theme: GrafanaTheme2, hex: string, base?: string): string;
