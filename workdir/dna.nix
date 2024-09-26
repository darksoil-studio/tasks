{ inputs, ... }:

{
  perSystem = { inputs', self', lib, system, ... }: {
    packages.tasks_test_dna = inputs.hc-infra.outputs.builders.${system}.dna {
      dnaManifest = ./dna.yaml;
      zomes = {
        notifications_integrity =
          inputs'.notifications.packages.notifications_integrity;
        notifications = inputs'.notifications.packages.notifications;
        # Include here the zome packages for this DNA, e.g.:
        profiles_integrity = inputs'.profiles.packages.profiles_integrity;
        profiles = inputs'.profiles.packages.profiles;
        # This overrides all the "bundled" properties for the DNA manifest
        tasks_integrity = self'.packages.tasks_integrity;
        tasks = self'.packages.tasks;
      };
    };
  };
}

