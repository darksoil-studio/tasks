{ inputs, ... }:

{
  perSystem = { inputs', lib, self', system, ... }: {
    packages.tasks_test_happ = inputs.hc-infra.outputs.builders.${system}.happ {
      happManifest = ./happ.yaml;

      dnas = {
        # Include here the DNA packages for this hApp, e.g.:
        # my_dna = inputs'.some_input.packages.my_dna;
        # This overrides all the "bundled" properties for the hApp manifest 
        tasks_test = self'.packages.tasks_test_dna;
      };
    };
  };
}
