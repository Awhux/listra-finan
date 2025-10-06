<?php

use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);
Route::post('/simulations', [VehicleController::class, 'simulate']);
Route::get('/health', function () {
    return response()->json(['message' => 'OK']);
});
