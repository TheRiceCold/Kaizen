{ 
  inputs, system, stdenv,
  writeShellScript, 

  # Utilities
  fd, bun, which, dart-sass,

  gtksourceview3,
  # accountsservice,

  # SERVICES
  vte,
  cage,
  cava,
  swww,
  # brotab,
  sptlrx,
  ydotool,
  cliphist,
  gromit-mpx,
  hyprpicker,
  # showmethekey, # TODO:
  wl-clipboard,
  brightnessctl,
  networkmanager,
  swappy,
  slurp, grim,
  wl-screenrec,
  version ? "git"
} : let
  name = "kaizen";

  matugen = inputs.matugen.packages.${system}.default;
  gtk-session-lock = inputs.gtk-session-lock.packages.${system}.default;
  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ vte gtksourceview3 gtk-session-lock ];
  };

  dependencies = [
    fd 
    which 
    dart-sass 
  
    cava              # Audio Visualizer
    swww              # Animated Wallpaper Daemon
    # brotab
    sptlrx            # Spotify Lyrics
    matugen           # Color generation tool
    ydotool           # Generic command-line automation tool
    cliphist          # Clipboard History Manager
    hyprpicker        # Wayland Color Picker
    gromit-mpx        # Annotation Tool
    grim
    slurp             # Region Selector
    swappy
    wl-screenrec      # High Performance Screen Recorder
    wl-clipboard      # Command-line copy/paste utilities for Wayland
    brightnessctl     # Read and Control Brightness
    networkmanager
  ];

  addBins = list: builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") list);

  greeter = writeShellScript "kaizen-dm" ''
    export PATH=$PATH:${addBins dependencies}
    ${cage}/bin/cage -ds -m last ${ags}/bin/ags -- -c ${config}/greeter.js
  '';

  lockscreen = writeShellScript "kaizen-lock" ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b kaizen-lock -c ${config}/lockscreen.js
  '';

  desktop = writeShellScript name ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name} -c ${config}/config.js $@
  '';

  config = stdenv.mkDerivation {
    inherit name;
    src = ../ags;

    buildPhase = ''
      ${bun}/bin/bun build ./desktop/main.ts \
      --outfile main.js \
      --external 'resource://*' \
      --external 'gi://*' \

      ${bun}/bin/bun build ./lockscreen/main.ts \
      --outfile lockscreen.js \
      --external 'resource://*' \
      --external 'gi://*' \

      ${bun}/bin/bun build ./greeter/main.ts \
      --outfile greeter.js \
      --external 'resource://*' \
      --external 'gi://*' \
    '';

    installPhase = ''
      mkdir -p $out

      cp -r css $out
      cp -r misc $out
      cp -r assets $out

      cp -r desktop $out
      cp -r greeter $out
      cp -r lockscreen $out

      cp -f main.js $out/config.js
      cp -f greeter.js $out/greeter.js
      cp -f lockscreen.js $out/lockscreen.js
    '';
  };
in stdenv.mkDerivation {
  inherit name version;
  src = config;
  
  installPhase = ''
    mkdir -p $out/bin
    cp -r . $out
    cp ${desktop} $out/bin/${name}
    cp ${greeter} $out/bin/${name}-dm
    cp ${lockscreen} $out/bin/${name}-lock
  '';
}
