param()

# Check prerequisites and return feature directory and available docs
$featureDir = "specs/1-ai-textbook"
$availableDocs = @(
    "plan.md",
    "spec.md",
    "data-model.md",
    "research.md",
    "quickstart.md"
)

# Check if contracts directory exists
if (Test-Path "$featureDir/contracts") {
    $availableDocs += "contracts"
}

$result = @{
    FEATURE_DIR = $featureDir
    AVAILABLE_DOCS = $availableDocs
} | ConvertTo-Json

Write-Output $result