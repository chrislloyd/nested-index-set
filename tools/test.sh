#!/usr/bin/env bash
set -euo pipefail

# typescript check
npx tsc --noEmit

# npm package integration test
# finds errors in the package.json configuration (main, type export etc.)
{
    package="$PWD/$(npm pack)"
    tmpdir=$(mktemp -d)
    pushd "$tmpdir"
        npm init --yes
        npm install ts-node "$package"
        cat << EOF > index.ts
import NestedIndexSet from '@chrislloyd/nested-index-set';
console.log(new NestedIndexSet(0, 1, 2));
EOF
        output=$(npx ts-node index.ts)
        expected="NestedIndexSet { min: 0, index: 1, max: 2 }"
    popd 
    rm -rf "$tmpdir" # cleanup
} &> /dev/null
test "$output" = "$expected" || echo "fail" "$output"
