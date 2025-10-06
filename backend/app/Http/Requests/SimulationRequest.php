<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SimulationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'vehicle_id' => ['required', 'integer', 'exists:vehicles,id'],
            'down_payment' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'vehicle_id.required' => 'The vehicle ID is required.',
            'vehicle_id.exists' => 'The selected vehicle does not exist.',
            'down_payment.required' => 'The down payment is required.',
            'down_payment.numeric' => 'The down payment must be a number.',
            'down_payment.min' => 'The down payment must be at least 0.',
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('down_payment')) {
            $this->merge([
                'down_payment' => (float) $this->down_payment,
            ]);
        }
    }
}
