import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .web3_utils import get_contract, w3

# Utility function to parse JSON body
def get_json_data(request):
    try:
        return json.loads(request.body)
    except json.JSONDecodeError:
        return None

# Endpoint to add a candidate
@csrf_exempt
@require_http_methods(["POST"])
def add_candidate(request):
    data = get_json_data(request)
    if data is None or 'name' not in data:
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)

    candidate_name = data['name']
    contract = get_contract()

    try:
        # Add candidate
        tx_hash = contract.functions.addCandidate(candidate_name).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to remove a candidate
@csrf_exempt
@require_http_methods(["POST"])
def remove_candidate(request):
    data = get_json_data(request)
    if data is None or 'candidate_id' not in data:
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)

    candidate_id = int(data['candidate_id'])
    contract = get_contract()

    try:
        # Remove candidate and reorder the remaining candidates
        tx_hash = contract.functions.removeCandidate(candidate_id).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to vote for a candidate
@csrf_exempt
@require_http_methods(["POST"])
def vote(request):
    data = get_json_data(request)
    if data is None or 'candidate_id' not in data:
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)
    
    candidate_id = int(data['candidate_id'])
    contract = get_contract()

    try:
        tx_hash = contract.functions.vote(candidate_id).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to get the vote count for a candidate
@csrf_exempt
def get_vote_count(request, candidate_id):
    contract = get_contract()
    try:
        vote_count = contract.functions.getVoteCount(candidate_id).call()
        return JsonResponse({'candidate_id': candidate_id, 'vote_count': vote_count})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to get the total number of candidates
@csrf_exempt
def get_candidates_count(request):
    contract = get_contract()
    try:
        candidates_count = contract.functions.getCandidatesCount().call()
        return JsonResponse({'candidates_count': candidates_count})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to get the total number of votes
@csrf_exempt
def get_total_votes(request):
    contract = get_contract()
    try:
        total_votes = contract.functions.getTotalVotes().call()
        return JsonResponse({'total_votes': total_votes})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to retrieve all candidates with their names and vote counts
@csrf_exempt
@require_http_methods(["GET"])
def get_candidates(request):
    contract = get_contract()
    
    try:
        candidates_count = contract.functions.getCandidatesCount().call()
        candidates_list = []
        
        for i in range(1, candidates_count + 1):
            try:
                candidate = contract.functions.getCandidate(i).call()
                if candidate[0]:
                    candidates_list.append({
                        'id': i,
                        'name': candidate[0],
                        'vote_count': candidate[1]
                    })
            except Exception:
                continue
            
        return JsonResponse({'status': 'success', 'candidates': candidates_list})
    
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
