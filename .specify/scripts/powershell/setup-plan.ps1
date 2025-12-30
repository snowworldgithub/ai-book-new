param()

# Setup script for plan generation
$featureSpec = "specs/1-ai-textbook/spec.md"
$implPlan = "specs/1-ai-textbook/plan.md"
$specsDir = "specs"
$branch = "1-ai-textbook"

$result = @{
    FEATURE_SPEC = $featureSpec
    IMPL_PLAN = $implPlan
    SPECS_DIR = $specsDir
    BRANCH = $branch
} | ConvertTo-Json

Write-Output $result