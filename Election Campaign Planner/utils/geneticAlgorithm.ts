import { SelectedArea } from '../App';

// Haversine formula to calculate distance between two points on Earth
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

// Calculate total distance for a route
export function calculateRouteDistance(route: SelectedArea[]): number {
  if (route.length < 2) return 0;
  
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const current = route[i];
    const next = route[i + 1];
    totalDistance += calculateDistance(
      current.coordinates[1], current.coordinates[0],
      next.coordinates[1], next.coordinates[0]
    );
  }
  
  // Add distance back to start to complete the circuit
  const first = route[0];
  const last = route[route.length - 1];
  totalDistance += calculateDistance(
    last.coordinates[1], last.coordinates[0],
    first.coordinates[1], first.coordinates[0]
  );
  
  return totalDistance;
}

// Genetic Algorithm for TSP
export interface GeneticAlgorithmParams {
  populationSize: number;
  generations: number;
  mutationRate: number;
  elitismRate: number;
}

export interface OptimizationResult {
  bestRoute: SelectedArea[];
  bestDistance: number;
  generationHistory: { generation: number; bestDistance: number; averageDistance: number }[];
  improvementPercentage: number;
}

export class GeneticAlgorithmTSP {
  private areas: SelectedArea[];
  private params: GeneticAlgorithmParams;
  private population: SelectedArea[][];
  private generationHistory: { generation: number; bestDistance: number; averageDistance: number }[] = [];

  constructor(areas: SelectedArea[], params: GeneticAlgorithmParams) {
    this.areas = [...areas];
    this.params = params;
    this.population = [];
    this.generationHistory = [];
  }

  // Initialize random population
  private initializePopulation(): void {
    this.population = [];
    for (let i = 0; i < this.params.populationSize; i++) {
      const route = [...this.areas];
      // Shuffle the route randomly
      for (let j = route.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [route[j], route[k]] = [route[k], route[j]];
      }
      this.population.push(route);
    }
  }

  // Calculate fitness (inverse of distance - shorter distance = higher fitness)
  private calculateFitness(route: SelectedArea[]): number {
    const distance = calculateRouteDistance(route);
    return 1 / (1 + distance); // Avoid division by zero
  }

  // Tournament selection
  private selectParent(): SelectedArea[] {
    const tournamentSize = 3;
    let best = this.population[Math.floor(Math.random() * this.population.length)];
    let bestFitness = this.calculateFitness(best);

    for (let i = 1; i < tournamentSize; i++) {
      const candidate = this.population[Math.floor(Math.random() * this.population.length)];
      const candidateFitness = this.calculateFitness(candidate);
      if (candidateFitness > bestFitness) {
        best = candidate;
        bestFitness = candidateFitness;
      }
    }
    return [...best];
  }

  // Order Crossover (OX) - preserves relative order of cities
  private crossover(parent1: SelectedArea[], parent2: SelectedArea[]): SelectedArea[] {
    const size = parent1.length;
    const start = Math.floor(Math.random() * size);
    const end = Math.floor(Math.random() * (size - start)) + start;
    
    const child: (SelectedArea | null)[] = new Array(size).fill(null);
    
    // Copy segment from parent1
    for (let i = start; i <= end; i++) {
      child[i] = parent1[i];
    }
    
    // Fill remaining positions with cities from parent2 in order
    let parent2Index = 0;
    for (let i = 0; i < size; i++) {
      if (child[i] === null) {
        while (child.includes(parent2[parent2Index])) {
          parent2Index++;
        }
        child[i] = parent2[parent2Index];
        parent2Index++;
      }
    }
    
    return child as SelectedArea[];
  }

  // Swap mutation
  private mutate(route: SelectedArea[]): SelectedArea[] {
    if (Math.random() > this.params.mutationRate) {
      return route;
    }
    
    const mutated = [...route];
    const i = Math.floor(Math.random() * mutated.length);
    const j = Math.floor(Math.random() * mutated.length);
    [mutated[i], mutated[j]] = [mutated[j], mutated[i]];
    
    return mutated;
  }

  // 2-opt local optimization
  private twoOptImprovement(route: SelectedArea[]): SelectedArea[] {
    let bestRoute = [...route];
    let bestDistance = calculateRouteDistance(bestRoute);
    let improved = true;

    while (improved) {
      improved = false;
      for (let i = 1; i < route.length - 2; i++) {
        for (let j = i + 1; j < route.length; j++) {
          if (j - i === 1) continue; // Skip adjacent edges
          
          const newRoute = [...bestRoute];
          // Reverse the segment between i and j
          for (let k = 0; k < Math.floor((j - i) / 2); k++) {
            [newRoute[i + k], newRoute[j - k]] = [newRoute[j - k], newRoute[i + k]];
          }
          
          const newDistance = calculateRouteDistance(newRoute);
          if (newDistance < bestDistance) {
            bestRoute = newRoute;
            bestDistance = newDistance;
            improved = true;
          }
        }
      }
    }
    
    return bestRoute;
  }

  // Main optimization function
  public optimize(): OptimizationResult {
    // Initialize
    this.initializePopulation();
    this.generationHistory = [];
    
    // Get initial best distance for improvement calculation
    const initialBestDistance = Math.min(...this.population.map(route => calculateRouteDistance(route)));
    
    for (let generation = 0; generation < this.params.generations; generation++) {
      // Calculate fitness for all routes
      const fitness = this.population.map(route => ({
        route,
        fitness: this.calculateFitness(route),
        distance: calculateRouteDistance(route)
      }));
      
      // Sort by fitness (descending)
      fitness.sort((a, b) => b.fitness - a.fitness);
      
      // Track generation statistics
      const bestDistance = fitness[0].distance;
      const averageDistance = fitness.reduce((sum, f) => sum + f.distance, 0) / fitness.length;
      
      this.generationHistory.push({
        generation,
        bestDistance,
        averageDistance
      });
      
      // Create new population
      const newPopulation: SelectedArea[][] = [];
      
      // Elitism - keep best routes
      const eliteCount = Math.floor(this.params.populationSize * this.params.elitismRate);
      for (let i = 0; i < eliteCount; i++) {
        newPopulation.push([...fitness[i].route]);
      }
      
      // Generate offspring
      while (newPopulation.length < this.params.populationSize) {
        const parent1 = this.selectParent();
        const parent2 = this.selectParent();
        let child = this.crossover(parent1, parent2);
        child = this.mutate(child);
        newPopulation.push(child);
      }
      
      this.population = newPopulation;
      
      // Apply 2-opt improvement to best routes occasionally
      if (generation % 10 === 0) {
        for (let i = 0; i < Math.min(5, this.population.length); i++) {
          this.population[i] = this.twoOptImprovement(this.population[i]);
        }
      }
    }
    
    // Final evaluation
    const finalFitness = this.population.map(route => ({
      route,
      distance: calculateRouteDistance(route)
    }));
    
    finalFitness.sort((a, b) => a.distance - b.distance);
    
    const bestRoute = finalFitness[0].route;
    const bestDistance = finalFitness[0].distance;
    const improvementPercentage = ((initialBestDistance - bestDistance) / initialBestDistance) * 100;
    
    return {
      bestRoute,
      bestDistance,
      generationHistory: this.generationHistory,
      improvementPercentage
    };
  }
}

// Convenience function for quick optimization
export function optimizeRoute(
  areas: SelectedArea[],
  params: Partial<GeneticAlgorithmParams> = {}
): Promise<OptimizationResult> {
  return new Promise((resolve) => {
    const defaultParams: GeneticAlgorithmParams = {
      populationSize: 50,
      generations: 100,
      mutationRate: 0.02,
      elitismRate: 0.1
    };
    
    const finalParams = { ...defaultParams, ...params };
    const ga = new GeneticAlgorithmTSP(areas, finalParams);
    
    // Run optimization in next tick to allow UI updates
    setTimeout(() => {
      const result = ga.optimize();
      resolve(result);
    }, 10);
  });
}