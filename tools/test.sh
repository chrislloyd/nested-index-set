#!/usr/bin/env bash
set -euo pipefail

# check npm lockfile
npm ci

# check types
npx tsc --noEmit

# check npm package.json
# finds errors in the configuration (main, type export etc.)
{
    npm run build
    package="$PWD/$(npm pack)"
    tmpdir=$(mktemp -d)
    pushd "$tmpdir"
        npm init --yes
        npm install --save "$package"
        npm install --save-dev ts-node
        cat << EOF > index.ts
import NestedIndexSet from '@chrislloyd/nested-index-set';
console.log(new NestedIndexSet(0, 1, 2));
EOF
        output=$(npx ts-node index.ts)
        expected="NestedIndexSet { min: 0, index: 1, max: 2 }"
    popd
    # cleanup
    rm -rf "$tmpdir"
} &> /dev/null
test "$output" = "$expected" || echo "fail" "$output"
