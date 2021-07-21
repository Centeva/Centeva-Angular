export interface ITimezone {
  /**
   * @publicDocs
   * Timezone id.
   */
  id: string;
  /**
   * @publicDocs
   * Timezone name.
   */
  name: string;
  /**
   * @publicDocs
   * Timezone offset in seconds.
   */
  dstOffset: number;
  /**
   * @Timezone day light savings time offset in seconds.
   */
  rawOffset: number;
}
