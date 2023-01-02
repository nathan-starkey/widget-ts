namespace TagEditor.Widgets {
  export class Range extends Vector {
    constructor(name: string) {
      super(name, 2, [undefined, " to ", undefined]);
    }
  }
}