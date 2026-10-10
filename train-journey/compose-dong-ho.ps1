Add-Type -AssemblyName System.Drawing

$partDir = Join-Path $PSScriptRoot 'dist\panorama-parts'
$output = Join-Path $PSScriptRoot 'dist\panorama-dong-ho-journey.png'
$images = 1..8 | ForEach-Object { [System.Drawing.Bitmap]::FromFile((Join-Path $partDir "dong-ho-$_.png")) }
$height = 941
$panelWidth = 1672
$overlap = 230
$width = ($panelWidth * $images.Count) - ($overlap * ($images.Count - 1))
$canvas = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($images[0], 0, 0, $panelWidth, $height)

for ($n = 1; $n -lt $images.Count; $n++) {
    $start = $n * ($panelWidth - $overlap)
    $destination = [System.Drawing.Rectangle]::new($start + $overlap, 0, $panelWidth - $overlap, $height)
    $source = [System.Drawing.Rectangle]::new($overlap, 0, $panelWidth - $overlap, $height)
    $graphics.DrawImage($images[$n], $destination, $source, [System.Drawing.GraphicsUnit]::Pixel)

    for ($column = 0; $column -lt $overlap; $column++) {
        $opacity = [single](($column + 1) / $overlap)
        $matrix = [System.Drawing.Imaging.ColorMatrix]::new()
        $matrix.Matrix00 = 1; $matrix.Matrix11 = 1; $matrix.Matrix22 = 1
        $matrix.Matrix33 = $opacity; $matrix.Matrix44 = 1
        $attributes = [System.Drawing.Imaging.ImageAttributes]::new()
        $attributes.SetColorMatrix($matrix)
        $target = [System.Drawing.Rectangle]::new($start + $column, 0, 1, $height)
        $graphics.DrawImage($images[$n], $target, $column, 0, 1, $height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
        $attributes.Dispose()
    }
}

$canvas.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$canvas.Dispose()
$images | ForEach-Object { $_.Dispose() }
Write-Output "$output ($width x $height)"
