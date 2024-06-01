class JaratKezelo {
    private jaratok: Map<string, { repterHonnan: string, repterHova: string, indulas: Date, keses: number }>;
  
    constructor() {
      this.jaratok = new Map();
    }
  
    ujJarat(jaratSzam: string, repterHonnan: string, repterHova: string, indulas: Date): void {
      if (this.jaratok.has(jaratSzam)) {
        throw new Error("Duplikált járatszám!");
      }
      this.jaratok.set(jaratSzam, { repterHonnan, repterHova, indulas, keses: 0 });
    }
  
    keses(jaratSzam: string, keses: number): void {
      const jarat = this.jaratok.get(jaratSzam);
      if (!jarat) {
        throw new Error("Nem létező járat!");
      }
      jarat.keses += keses;
      if (jarat.keses < 0) {
        jarat.keses = 0;
        throw new Error("A késés nem lehet negatív!");
      }
    }
  
    mikorIndul(jaratSzam: string): Date {
      const jarat = this.jaratok.get(jaratSzam);
      if (!jarat) {
        throw new Error("Nem létező járat!");
      }
      return new Date(jarat.indulas.getTime() + jarat.keses * 60000);
    }
  
    jaratokRepuloterrol(repter: string): string[] {
      const eredmeny: string[] = [];
      this.jaratok.forEach((jarat, jaratSzam) => {
        if (jarat.repterHonnan === repter) {
          eredmeny.push(jaratSzam);
        }
      });
      return eredmeny;
    }
}
  
export default JaratKezelo;  