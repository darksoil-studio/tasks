{
  description = "Template for Holochain app development";

  inputs = {
    nixpkgs.follows = "holonix/nixpkgs";
    holonix.url = "github:holochain/holonix/main-0.3";
    flake-parts.follows = "holonix/flake-parts";

    hc-infra.url = "github:holochain-open-dev/infrastructure";
    scaffolding.url = "github:holochain-open-dev/templates";

    notifications.url = "github:darksoil-studio/notifications/main";
    profiles.url = "github:holochain-open-dev/profiles/nixify";
  };

  nixConfig = {
    extra-substituters = [
      "https://holochain-open-dev.cachix.org"
      "https://darksoil-studio.cachix.org"
    ];
    extra-trusted-public-keys = [
      "holochain-open-dev.cachix.org-1:3Tr+9in6uo44Ga7qiuRIfOTFXog+2+YbyhwI/Z6Cp4U="
      "darksoil-studio.cachix.org-1:UEi+aujy44s41XL/pscLw37KEVpTEIn8N/kn7jO8rkc="
    ];
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        ./zomes/integrity/tasks/zome.nix
        ./zomes/coordinator/tasks/zome.nix
        # Just for testing purposes
        ./workdir/dna.nix
        ./workdir/happ.nix
      ];

      systems = builtins.attrNames inputs.holonix.devShells;
      perSystem = { inputs', config, pkgs, system, ... }: {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            inputs'.hc-infra.devShells.synchronized-pnpm
            inputs'.holonix.devShells.default
          ];

          packages = [ inputs'.scaffolding.packages.hc-scaffold-zome-template ];
        };

        packages.scaffold = pkgs.symlinkJoin {
          name = "scaffold-remote-zome";
          paths = [ inputs'.hc-infra.packages.scaffold-remote-zome ];
          buildInputs = [ pkgs.makeWrapper ];
          postBuild = ''
            wrapProgram $out/bin/scaffold-remote-zome \
              --add-flags "@darksoil-studio/tasks \
                --integrity-zome-name tasks_integrity \
                --coordinator-zome-name tasks \
                --remote-zome-git-url github:darksoil-studio/tasks \
                --remote-npm-package-name tasks \
                --remote-npm-package-path ui \
                --remote-zome-git-branch main" 
          '';
        };
      };
    };
}
