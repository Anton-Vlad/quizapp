<?php

use App\Models\User;
use App\Services\UserContextService;

if (!function_exists('getTheCurrentUser')) {
    function getTheCurrentUser(): User
    {
        return app(UserContextService::class)->getOrCreateCurrentUser();
    }
}